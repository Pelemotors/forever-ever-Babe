import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for greetings
export const greetingsApi = {
  // Create a new greeting (for guests)
  async createGreeting(greetingData) {
    const { data, error } = await supabase
      .from('greetings')
      .insert([{
        full_name: greetingData.fullName,
        email: greetingData.email || null,
        content: greetingData.message,
        post_id: greetingData.postId || null,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get approved greetings (for public display)
  async getApprovedGreetings() {
    const { data, error } = await supabase
      .from('greetings')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get all greetings (for admin)
  async getAllGreetings() {
    const { data, error } = await supabase
      .from('greetings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get pending greetings (for admin)
  async getPendingGreetings() {
    const { data, error } = await supabase
      .from('greetings')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Approve greeting (for admin)
  async approveGreeting(id) {
    const { data, error } = await supabase
      .from('greetings')
      .update({ 
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: 'admin'
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Reject greeting (for admin)
  async rejectGreeting(id) {
    const { data, error } = await supabase
      .from('greetings')
      .update({ 
        status: 'rejected',
        approved_at: new Date().toISOString(),
        approved_by: 'admin'
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete greeting (for admin)
  async deleteGreeting(id) {
    const { error } = await supabase
      .from('greetings')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Helper functions for media
export const mediaApi = {
  // Upload file to storage (for admin)
  async uploadFile(file, greetingId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${greetingId}_${Date.now()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, file)

    if (error) throw error

    // Create media record
    const { data: mediaData, error: mediaError } = await supabase
      .from('media')
      .insert([{
        greeting_id: greetingId,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: 'admin'
      }])
      .select()
      .single()

    if (mediaError) throw mediaError
    return { ...data, ...mediaData }
  },

  // Get media for greeting
  async getMediaForGreeting(greetingId) {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('greeting_id', greetingId)

    if (error) throw error
    return data
  },

  // Get public URL for file
  getPublicUrl(filePath) {
    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath)
    return data.publicUrl
  },

  // Delete media (for admin)
  async deleteMedia(id) {
    // First get the file path
    const { data: media, error: fetchError } = await supabase
      .from('media')
      .select('file_path')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('uploads')
      .remove([media.file_path])

    if (storageError) throw storageError

    // Delete from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('id', id)

    if (dbError) throw dbError
  }
}

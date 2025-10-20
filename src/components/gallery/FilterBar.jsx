import Button from '../ui/Button';

const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'הכל' },
    { id: 'אנחנו', label: 'אנחנו' },
    { id: 'פלא', label: 'פלא' },
    { id: 'מיראל', label: 'מיראל' },
    { id: 'יום-יום', label: 'יום יום' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'primary' : 'outline'}
          size="md"
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterBar;


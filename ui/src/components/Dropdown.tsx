import Select, { ActionMeta, GroupBase, OptionsOrGroups } from "react-select";

interface DropdownProps {
  handleSearch:
    | ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void)
    | undefined;
  options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
}

const Dropdown: React.FC<DropdownProps> = ({ handleSearch, options }) => {
  return (
    <div className="w-full">
      <Select
        options={options}
        onChange={handleSearch}
        isClearable
        placeholder="Search projects..."
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-black shadow-lg border-2 border-gray-300 rounded-lg focus:border-indigo-500"
      />
    </div>
  );
};

export default Dropdown;

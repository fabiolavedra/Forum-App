const TagItem = ({ name, count }) => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium">#</span>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-xs text-gray-500">{count}</div>
      </div>
    </div>
  );
};

export default TagItem;

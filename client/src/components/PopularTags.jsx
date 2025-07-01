import TagItem from "./TagItem";

const PopularTags = () => {
  const tags = [
    { name: "#javascript", count: "69,854 Posted by the Top" },
    { name: "#bitcoin", count: "45,211 Posted by Trending" },
    { name: "#technology", count: "43,584 Trending in Bangladesh" },
    { name: "#biology", count: "38,584 Trending in Albania" },
    { name: "#business", count: "37,584 Posted by the Top" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
      <div className="space-y-3">
        {tags.map((tag, index) => (
          <TagItem key={index} {...tag} />
        ))}
      </div>
    </div>
  );
};

export default PopularTags;

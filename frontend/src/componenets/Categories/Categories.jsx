import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getApiData = async () => {
    try {
      const res = await axios.get('categories.json');
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="container  mt-24 p-4">
      <h2 className="text-3xl font-bold mb-12">Top Categories</h2>
      <div className="grid grid-cols-3 gap-8  ">
        {categories.map((category) => {
          const { id, title } = category;
          return (
            <div
              className="border border-teal-400 p-4 rounded-lg text-center max-w-[400px] hover:shadow-xl hover:shadow-slate-400"
              key={id}
            >
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

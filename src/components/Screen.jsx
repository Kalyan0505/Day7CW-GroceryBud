import { useEffect, useRef, useState } from "react";

export default function Screen() {
  const inputRef = useRef();
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (inputRef.current.value != "") {
      const itemObj = {
        grocery: inputRef.current.value,
        isChecked: false,
      };
      setItems((pre) => [...pre, itemObj]);
      inputRef.current.value = "";
    }
  };
  useEffect(() => {
    if (localStorage.getItem("groceryItems") != null) {
      setItems(JSON.parse(localStorage.getItem("groceryItems")));
    }
  }, []);
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("groceryItems", JSON.stringify(items));
    }
  }, [items]);

  const handleCheckBoxChange = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  const handleDelete = (index) => {
    setItems((prev) => prev.filter((ele, i) => index !== i));
  };

  return (
    <div className="shadow-lg p-12 rounded-md  ">
      <h1 className="text-4xl  font-bold mb-12 text-black-600">Grocery Bud</h1>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          ref={inputRef}
          className="w-96 border-2 h-12 rounded-md p-4"
        />
        <button
          className="h-12 bg-sky-600 text-white p-4 flex justify-center items-center rounded-md"
          onClick={handleAddItem}
        >
          Add item
        </button>
      </div>
      <div className="">
        {items.map((item, index) => {
          return (
            <div key={index} className="flex justify-between mb-4 items-center">
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={() => handleCheckBoxChange(index)}
              />
              <p
                style={{
                  textDecoration: item.isChecked ? "line-through" : "none",
                }}
              >
                {item.grocery}
              </p>
              <button
                className="h-12 bg-black text-white p-4 flex justify-center items-center rounded-md"
                onClick={() => handleDelete(index)}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

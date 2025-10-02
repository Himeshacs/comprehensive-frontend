import React, { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // 🔁 Runs every time 'count' changes
  useEffect(() => {
    console.log("✅ Count updated:", count);
  }, [count]);

  // 🔁 Runs only once, when component mounts
  useEffect(() => {
    console.log("🎉 Component mounted!");

    // 🧹 Cleanup (runs on unmount)
    return () => {
      console.log("🧼 Component unmounted!");
    };
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Example;

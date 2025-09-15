import "./App.css";
import { LandingPage } from "@/features/home/LandingPage";
import supabase from "@/config/supabaseClient";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  console.log("Data ", data);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("candidate").select("*");
      if (error) {
        console.log("Error fetching data ", error);
      } else {
        setData(data);
        console.log("Fetched data ", data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;

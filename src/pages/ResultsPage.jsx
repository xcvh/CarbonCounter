import Card from "../components/ui/Card";
import Progress from "../components/ui/Progress";
import Stat from "../components/ui/Stat";
import { useState, useEffect } from "react";


function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) return value;
  }
  return null;
}

function ResultsPage() {
  const [data, setData] = useState([]);
  const userCode = getCookie("userCode");

  useEffect(() => {
    if (!userCode) return;
    
    fetch(`http://localhost:5500/api/results/${userCode}`)
      .then((response) => response.json())
      .then((apiData) => setData(apiData))
      .catch((error) => console.error("Error fetching results:", error));
  }, [userCode]);

  return (
    <div className="prose container mx-auto w-full max-w-5xl">
      <h2>Your Results</h2>
      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <Card key={index} image={`${item.category.toLowerCase()}.jpg`} imageAlt={item.category} title={item.category} badges={item.badges} badgeColor={item.badgeColor}>
            <Stat tons={item.tons} percentage={item.percentage} />
            <p>{item.description}</p>
            <Progress value={Math.min(Math.max(item.percentage, 0), 100)} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;

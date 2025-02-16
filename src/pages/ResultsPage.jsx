import Card from "../components/ui/Card";
import Progress from "../components/ui/Progress";
import Stat from "../components/ui/Stat";
import { useState } from "react";

function ResultsPage() {
  const [data, setData] = useState([]);

  return (
    <div className="prose container mx-auto w-full max-w-5xl">
      <h2>Your Results</h2>
      <div className="grid grid-cols-2 gap-2">
        <Card
          image="living.jpg"
          imageAlt="A shot of the earth from space"
          title="Living"
          badges={["Good"]}
          badgeColor="badge-success"
        >
          <Stat tons={3} percentage={-20} />
          <p>
            Your energy use is efficient and eco-friendly! Whether it’s using
            renewables or minimizing waste, you’re keeping your footprint low.
          </p>
          <Progress value={20} />
        </Card>
        <Card
          image="mobility.jpg"
          imageAlt="A shot of a busy highway intersection"
          title="Mobility"
          badges={["So so"]}
          badgeColor="badge-warning"
        >
          <p>
            Your travel choices balance sustainability and convenience. Cutting
            back on flights or car trips could further reduce your emissions.
          </p>
          <Progress value={46} />
        </Card>
        <Card
          image="food.jpg"
          imageAlt="A bowl of food"
          title="Food"
          badges={["Bad"]}
          badgeColor="badge-error"
        >
          <p>
            Your diet has a high carbon impact, likely due to meat consumption
            or food waste. Eating more plant-based meals can help lower it.
          </p>
          <Progress value={77} />
        </Card>
        <Card
          image="consumption.jpg"
          imageAlt="A photo of a mural saying 'Use less'"
          title="Consumption"
          badges={["Good"]}
          badgeColor="badge-success"
        >
          <p>
            You make mindful choices, avoiding waste and unnecessary purchases.
            Your habits help reduce environmental impact—keep it up!
          </p>
          <Progress value={17} />
        </Card>
      </div>
    </div>
  );
}

export default ResultsPage;

import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import Modal, { useModal } from '../components/ui/Modal';
import Toggle from '../components/ui/Toggle';
import Range from '../components/ui/Range';
import Input from '../components/ui/Input';
import { Progress, RadialProgress } from '../components/ui/Progress';
import Alert from '../components/ui/Alert';
import Card from '../components/ui/Card';

function Components() {
  const [rangeValue, setRangeValue] = useState(25);
  const [isToggled, setIsToggled] = useState(true);
  const { open: openModal } = useModal('my_modal_1');

  const emojis = ['😵', '🥴', '😊', '🤗', '😍'];

  return (
    <div className="prose container mx-auto">
      <h2>Components</h2>
      <p>The components we will use to build the questionnaires and results pages.</p>

      <h3>Buttons</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        <Button>Button</Button>
        <Button variant="neutral">Neutral</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <h3>Dropdowns</h3>
      <Dropdown
        trigger="Click"
        items={[
          { label: 'Item 1', onClick: () => { } },
          { label: 'Item 2', onClick: () => { } }
        ]}
      />

      <h3>Modal</h3>
      <Button onClick={openModal}>open modal</Button>
      <Modal id="my_modal_1" title="Hello!">
        Press ESC key or click the button below to close
      </Modal>

      <h3>Toggle</h3>
      <Toggle
        label="Remember me"
        checked={isToggled}
        onChange={(e) => setIsToggled(e.target.checked)}
      />

      <h3>Range</h3>
      <Range
        value={rangeValue}
        onChange={setRangeValue}
        step={25}
        markers={emojis}
      />

      <h3>Text Input</h3>
      <Input
        label="What is your name?"
        topRightLabel="Top Right label"
        bottomLeftLabel="Bottom Left label"
        bottomRightLabel="Bottom Right label"
        placeholder="Type here"
      />

      <h3>Progress</h3>
      <div className="flex flex-col gap-2">
        <Progress value={0} />
        <Progress value={10} />
        <Progress value={40} />
        <Progress value={70} />
        <Progress value={100} />
      </div>

      <h3>Radial Progress</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        <RadialProgress value={0} />
        <RadialProgress value={25} />
        <RadialProgress value={50} />
        <RadialProgress value={75} />
        <RadialProgress value={100} />
      </div>

      <h3>Alert</h3>
      <Alert>Success!</Alert>

      <h3>Cards</h3>
      <Card
        image="https://framerusercontent.com/images/CCKlDagBNBgBzM0GRBUNZ3dvRM.jpg?scale-down-to=1024"
        imageAlt="TechLabs Muenster"
        title="TechLabs"
        badges={['Münster']}
        actions={['DS', 'WD', 'DL', 'UI/UX']}
      >
        10 Events erwarten dich auf deiner 5-monatigen Journey und sorgen dafür, dass du neue Leute kennenlernst,
        von den Fähigkeiten deiner Mentor:innen lernst und dein Gelerntes nicht nur theoretisch, sondern auch
        praktisch anwenden kannst.
      </Card>
    </div>
  );
}

export default Components;

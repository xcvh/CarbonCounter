import React, { useState } from 'react';

function Components() {
  const [rangeValue, setRangeValue] = useState(25);

  return (
    <div className="prose container mx-auto">
      <h2 className="">
        Components
      </h2>
      <p>
        The components we will use to build the questionnaires and results pages.
      </p>
      <h3>Buttons</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        <button className="btn">Button</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-link">Link</button>
      </div>
      <h3>Dropdowns</h3>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">Click</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
      <h3>Modal</h3>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <h3>Toggle</h3>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Remember me</span>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
        </label>
      </div>
      <h3>Checkbox</h3>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Remember me</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
        </label>
      </div>
      <h3>Radio</h3>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Primary</span>
          <input type="radio" name="radio-10" className="radio radio-primary" defaultChecked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Secondary</span>
          <input type="radio" name="radio-10" className="radio radio-secondary" defaultChecked />
        </label>
      </div>
      <h3>Range</h3>
      <input
        type="range"
        min={0}
        max="100"
        value={rangeValue}
        onChange={(e) => setRangeValue(e.target.value)}
        className="range range-primary"
        step="25"
      />
      <div className="flex w-full justify-between px-2 text-xl">
        <span>😵</span>
        <span>🥴</span>
        <span>😊</span>
        <span>🤗</span>
        <span>😍</span>
      </div>
      <h3>Text Input</h3>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">What is your name?</span>
          <span className="label-text-alt">Top Right label</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
          <span className="label-text-alt">Bottom Right label</span>
        </div>
      </label>
      <h3>Divider</h3>
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">content</div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">content</div>
      </div>
      <h3>Progress</h3>
      <progress className="progress progress-primary w-56" value={0} max="100"></progress>
      <progress className="progress progress-primary w-56" value="10" max="100"></progress>
      <progress className="progress progress-primary w-56" value="40" max="100"></progress>
      <progress className="progress progress-primary w-56" value="70" max="100"></progress>
      <progress className="progress progress-primary w-56" value="100" max="100"></progress>
      <h3>Radial Progress</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        <div
          className="radial-progress bg-secondary text-primary-content border-secondary border-4"
          style={{ "--value": 0 }}
          role="progressbar">
          0%
        </div>
        <div
          className="radial-progress bg-secondary text-primary-content border-secondary border-4"
          style={{ "--value": 25 }}
          role="progressbar">
          25%
        </div>
        <div
          className="radial-progress bg-primary text-primary-content border-primary border-4"
          style={{ "--value": 50 }}
          role="progressbar">
          50%
        </div>
        <div
          className="radial-progress bg-secondary text-primary-content border-secondary border-4"
          style={{ "--value": 75 }}
          role="progressbar">
          75%
        </div>
        <div
          className="radial-progress bg-primary text-primary-content border-primary border-4"
          style={{ "--value": 100 }}
          role="progressbar">
          100%
        </div>
      </div>
      <h3>Tooltip</h3>
      <div className="tooltip" data-tip="hello">
        <button className="btn">Hover me</button>
      </div>
      <h3>Alert</h3>
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Success!</span>
      </div>
      <h3>Cards</h3>
      <div className="card bg-white shadow-xl w-96">
        <figure className="p-0 m-0">
          <img
            src="https://framerusercontent.com/images/CCKlDagBNBgBzM0GRBUNZ3dvRM.jpg?scale-down-to=1024"
            alt="TechLabs Muenster" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            TechLabs
            <div className="badge badge-secondary">Münster</div>
          </h2>
          <p>10 Events erwarten dich auf deiner 5-monatigen Journey und sorgen dafür, dass du neue Leute kennenlernst, von den Fähigkeiten deiner Mentor:innen lernst und dein Gelerntes nicht nur theoretisch, sondern auch praktisch anwenden kannst.</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">DS</div>
            <div className="badge badge-outline">WD</div>
            <div className="badge badge-outline">DL</div>
            <div className="badge badge-outline">UI/UX</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Components;

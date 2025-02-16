import React from "react";

const Card = ({
  image,
  imageAlt,
  title,
  badges = [],
  badgeColor = "badge-secondary",
  children,
  actions = [],
  className = "",
}) => {
  return (
    <div className={`card bg-white shadow-xl ${className}`}>
      {image && (
        <figure className="p-0 m-0 aspect-[16/9] w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        {(title || badges.length > 0) && (
          <h2 className="card-title">
            {title}
            {badges.map((badge, index) => (
              <div key={index} className={`badge ${badgeColor}`}>
                {badge}
              </div>
            ))}
          </h2>
        )}
        {children}
        {actions.length > 0 && (
          <div className="card-actions justify-end">
            {actions.map((action, index) => (
              <div key={index} className="badge badge-outline">
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const Card = ({
  image,
  imageAlt,
  title,
  subtitle,
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
          <h2 className="card-title mt-2">
            {title}
            {badges.map((badge, index) => (
              <div key={index} className={`badge ${badgeColor} whitespace-nowrap min-w-[4rem]`}>
                {badge}
              </div>
            ))}
          </h2>
        )}
        <h4 className="text-lg font-bold">{subtitle}</h4>
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

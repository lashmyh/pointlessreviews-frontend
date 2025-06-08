import star from "../assets/star.svg";

export const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-2 mb-5">
      {[1, 2, 3, 4, 5].map((value) => (
        <img
          key={value}
          src={star}
          alt="star"
          onClick={() => setRating(value)}
          className={`w-6 h-6 cursor-pointer invert transition-transform ${
            value <= rating ? "opacity-100" : "opacity-10"
          } hover:scale-110`}
        />
      ))}
    </div>
  );
};

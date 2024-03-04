function MovieRating({ rating = 0, onRating }) {
  const stars = [];
  console.log("item.user_rating ===", rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span
          key={i}
          onClick={() => onRating(i)}
          style={{ cursor: "pointer", color: "#62c0a2", fontSize: "xx-large" }}
        >
          ★
        </span>
      );
    } else {
      stars.push(
        <span
          key={i}
          onClick={() => onRating(i)}
          style={{ cursor: "pointer", color: "grey", fontSize: "xx-large" }}
        >
          ★
        </span>
      );
    }
  }

  return <div>{stars}</div>;
}

export default MovieRating;

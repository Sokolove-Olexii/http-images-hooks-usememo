const Button = ({ onClick }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
    >
      <button className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;

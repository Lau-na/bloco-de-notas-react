export default function ErrorList({ errors }) {
  return (
    <div className="mt-3">
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => {
            return (
              <li key={index} className="text-danger">
                {error}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

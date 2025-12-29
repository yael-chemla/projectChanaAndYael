import Home from "../pages/Home";
function Info({ user }) {
  if (!user) return <p>No user data</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
      <h2>Personal Info</h2>
      <p><strong>Full Name:</strong> {user.name || "N/A"}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Password:</strong> {user.website}</p>
      <p><strong>Email:</strong> {user.email || "N/A"}</p>

      {user.address && (
        <>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Suite:</strong> {user.address.suite}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
        </>
      )}
    </div>
  );
}

export default Info;

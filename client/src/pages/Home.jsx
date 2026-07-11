import apartment from "../assets/apartment.png";

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${apartment})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "90vh",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-white">

          <h1
            className="fw-bold"
            style={{
              fontSize: "60px",
            }}
          >
            Welcome to StayHub
          </h1>

          <h3 className="mt-3">
            Apartment Management System
          </h3>

          <p
            className="mt-4"
            style={{
              maxWidth: "650px",
              fontSize: "20px",
            }}
          >
            StayHub simplifies apartment living by helping
            residents raise complaints, receive notices,
            track maintenance payments, and stay connected
            with apartment management through one platform.
          </p>

          <a
            href="/register"
            className="btn btn-success btn-lg mt-4"
          >
            Get Started
          </a>

        </div>
      </div>
    </div>
  );
}

export default Home;
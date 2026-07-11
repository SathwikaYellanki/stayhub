import apartment from "../assets/apartment.png";

function AuthLayout({ title, children }) {
  const showBackground = [
    "Resident Login",
    "Admin Login",
    "Resident Registration",
    "Create Password",
  ].includes(title);

  return (
    <div
      style={
        showBackground
          ? {
              backgroundImage: `url(${apartment})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
            }
          : {
              minHeight: "100vh",
            }
      }
    >
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: showBackground
            ? "rgba(0,0,0,0.45)"
            : "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-md-5">

              <div
  className="card shadow-lg"
  style={{
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: "15px",
    animation: "fadeIn 0.8s ease",
  }}
>

                <div
                  className="card-header text-white text-center"
                  style={{
                    backgroundColor: "#198754",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  <h3 className="mb-0">{title}</h3>
                </div>

                <div className="card-body p-4">
                  {children}
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
function AuthLayout({ title, children }) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white text-center">

              <h3>{title}</h3>

            </div>

            <div className="card-body">

              {children}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AuthLayout;
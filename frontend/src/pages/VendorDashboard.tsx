function VendorDashboard() {
  return (
    <div className="bg-slate-950 min-h-screen text-white p-8">

      <h1 className="text-4xl font-bold">
        Vendor Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Products
          </h2>

          <p className="text-4xl mt-4">
            24
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Orders
          </h2>

          <p className="text-4xl mt-4">
            18
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Revenue
          </h2>

          <p className="text-4xl mt-4">
            KES 45K
          </p>
        </div>

      </div>
    </div>
  );
}

export default VendorDashboard;
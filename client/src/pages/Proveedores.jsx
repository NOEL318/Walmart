export const Proveedores = () => {
  return (
    <div className="proveedores">
      <div className="registro">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nombre Proveedor" />
        </form>
      </div>
    </div>
  );
};

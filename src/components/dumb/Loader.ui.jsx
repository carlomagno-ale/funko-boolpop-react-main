import styles from "../../assets/css_modules/Loader.module.css"

export default function Loader() {
  return (
    <div
      className="w-100 h-100 d-flex justify-content-center align-items-center"
      style={{

        zIndex: 9999,
      }}
    >
      <div className={`${styles.spinner_tondo} spinner-grow `} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

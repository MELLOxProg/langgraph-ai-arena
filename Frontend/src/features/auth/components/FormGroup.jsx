export default function FormGroup({ label, placeholder, value, onChange, type }) {
  return <div className="form-group"><label htmlFor={label}>{label}</label><input type={type} id={label} name={label} placeholder={placeholder} value={value} onChange={onChange} required /></div>
}
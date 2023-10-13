import styles from './authlayout.module.css';
const AuthLayout = ({children}) => {
  return (
    <div className={`${styles.layout_container} d-flex justify-content-center align-items-center`}>
      {children}
    </div>
  )
}

export default AuthLayout

import Swal from 'sweetalert2';
import { useRouter } from 'next/router'

interface AlertProps {
    text: string
}

const Alert = ({ text }: AlertProps) => {
    const router = useRouter()

    const showAlert = () => {
        Swal.fire({
            icon: 'error',
            text: text,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: '#2754d5',
            backdrop: true
        })
            .then((result) => {
                if (result.value) {
                    router.push('/login');
                }
            });
    }

    return (
        <>
            {showAlert()}
        </>
    );
}

export default Alert;
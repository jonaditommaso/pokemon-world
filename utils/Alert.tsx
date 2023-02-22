import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

interface AlertProps {
    text: string
}

const Alert = ({ text }: AlertProps) => {
    const router = useRouter()

    const showAlert = () => {
            // Swal.fire({
            //     icon: 'error',
            //     text: 'jh',
            //     showConfirmButton: true,
            //     confirmButtonText: "Ok",
            //     confirmButtonColor: '#2754d5',
            //     backdrop: false,
            // })
            //     .then((result) => {
            //         if (result.value) {
            //             router.push('/login');
            //         }
            //     });

    }

    return (
        <>
            {showAlert()}
        </>
    );
}

export default Alert;
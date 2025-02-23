import Swal from 'sweetalert2';

export const abandonBattleMessage = (okCallback: () => void) => {
    Swal.fire({
        icon: 'warning',
        text: 'Are you sure you want to abandon the battle?',
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: '#2754d5',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        backdrop: true
    })
        .then((result: any) => {
            if (result.value) {
                okCallback()
            }
        });
}
import { Button } from "./Button";

export const ConfirmDialog = ({ isOpen, message, onCancel, onConfirm, type }) => {

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex justify-center items-center m-5">
            <div className="bg-dark-purple rounded-3xl p-10 border-2 border-mauve">
                <p>{message}</p>

                {type === "warning" ? 
                    <div className="mt-10 flex justify-evenly">
                        <Button text="Cancel" colour="bg-neutral-500" action={onCancel}></Button>
                        <Button text="Confirm" colour="bg-red-400" action={onConfirm}></Button>
                    </div> : ""}

                {type === "error" ? 
                    <div className="mt-10 flex justify-evenly">
                        <Button text="Okay" action={onCancel}></Button>
                    </div> : ""}
                
            </div>
        </div>
    )
}
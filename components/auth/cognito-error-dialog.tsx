"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type CognitoErrorInfo = {
  title: string;
  description: string;
  action: string;
};

type CognitoError = { name?: string; message: string };

export function parseCognitoError(err: unknown): CognitoErrorInfo {
  const { name } = err as CognitoError;
  switch (name) {
    case "UsernameExistsException":
      return {
        title: "Correo ya registrado",
        description: "Este correo ya tiene una cuenta. Intenta iniciar sesión o usa otro correo.",
        action: "Reintentar",
      };
    case "InvalidPasswordException":
      return {
        title: "Contraseña inválida",
        description:
          "La contraseña no cumple los requisitos de seguridad. Debe tener al menos 8 caracteres, mayúsculas, números y símbolos.",
        action: "Reintentar",
      };
    case "InvalidParameterException":
      return {
        title: "Datos inválidos",
        description: "Uno de los datos ingresados no es válido. Revisa el formulario e inténtalo de nuevo.",
        action: "Reintentar",
      };
    case "NotAuthorizedException":
      return {
        title: "Credenciales incorrectas",
        description: "El correo o la contraseña no son correctos. Verifica tus datos e inténtalo de nuevo.",
        action: "Reintentar",
      };
    case "UserNotConfirmedException":
      return {
        title: "Cuenta sin confirmar",
        description: "Tu cuenta aún no ha sido verificada. Revisa tu correo y confirma tu cuenta para continuar.",
        action: "Entendido",
      };
    case "CodeMismatchException":
      return {
        title: "Código incorrecto",
        description: "El código que ingresaste no coincide. Revísalo e inténtalo de nuevo.",
        action: "Reintentar",
      };
    case "ExpiredCodeException":
      return {
        title: "Código expirado",
        description: "El código de verificación ha expirado. Vuelve al registro para solicitar uno nuevo.",
        action: "Entendido",
      };
    case "UserNotFoundException":
      return {
        title: "Correo no registrado",
        description: "No encontramos una cuenta con ese correo. Verifica que sea correcto o crea una cuenta nueva.",
        action: "Reintentar",
      };
    case "TooManyRequestsException":
    case "LimitExceededException":
      return {
        title: "Demasiados intentos",
        description: "Superaste el límite de intentos. Espera unos minutos antes de intentarlo de nuevo.",
        action: "Entendido",
      };
    default:
      return {
        title: "Servicio no disponible",
        description: "No pudimos procesar tu solicitud. Por favor inténtalo más tarde.",
        action: "Entendido",
      };
  }
}

export default function CognitoErrorDialog({
  errorInfo,
  onClose,
}: {
  errorInfo: CognitoErrorInfo | null;
  onClose: () => void;
}) {
  return (
    <AlertDialog open={!!errorInfo} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{errorInfo?.title}</AlertDialogTitle>
          <AlertDialogDescription>{errorInfo?.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center">
          <AlertDialogAction onClick={onClose}>{errorInfo?.action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

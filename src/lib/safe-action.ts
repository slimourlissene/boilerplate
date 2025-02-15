import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const safeAction = createSafeActionClient({
  handleServerError: (error: Error) => {
    if (error instanceof ActionError) {
      console.error(error);
      return error.message;
    }

    return "An error occurred while processing your request. Please try again later.";
  },
});

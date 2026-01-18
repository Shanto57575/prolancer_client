"use server";

interface ApiResponse {
  success: boolean;
  error?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export async function sendOtp(
  email: string,
  name: string,
): Promise<ApiResponse> {
  try {
    // Validate inputs
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Invalid email address",
      };
    }

    if (!name || name.trim().length === 0) {
      console.warn("Name not provided, backend will use stored user name");
    }

    const apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
      console.error("API URL not configured");
      return {
        success: false,
        error: "Server configuration error",
      };
    }

    const response = await fetch(`${apiUrl}/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name: name || "" }),
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      success: data.success ?? true,
      error: data.error,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Send OTP error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          success: false,
          error: "Request timeout. Please try again.",
        };
      }
    }

    return {
      success: false,
      error: "Failed to send OTP. Please check your connection and try again.",
    };
  }
}

export async function verifyOtp(
  email: string,
  otp: string,
): Promise<ApiResponse> {
  try {
    // Validate inputs
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Invalid email address",
      };
    }

    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      return {
        success: false,
        error: "Invalid OTP format",
      };
    }

    const apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
      console.error("API URL not configured");
      return {
        success: false,
        error: "Server configuration error",
      };
    }

    const response = await fetch(`${apiUrl}/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      success: data.success ?? true,
      error: data.error,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Verify OTP error:", error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          success: false,
          error: "Request timeout. Please try again.",
        };
      }
    }

    return {
      success: false,
      error:
        "Failed to verify OTP. Please check your connection and try again.",
    };
  }
}

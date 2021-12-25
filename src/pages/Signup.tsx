import type { FC } from "react";
import Card from "@components/Card";
import Center from "@components/Center";
import Page from "@components/Page";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import supabaseClient from "@/services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup: FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    const { name, email, password } = values;
    const { error } = await supabaseClient.auth.signUp(
      { email, password },
      {
        data: {
          name,
        },
      }
    );

    if (error) {
      return toast.error(error.message);
    }

    navigate("/chat");
  };

  return (
    <Page>
      <Center>
        <h1 className="text-4xl">Create account</h1>
        <div className="p-4" />
        <div className="text-black">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name" className="flex flex-col">
                <div className="mb-1">Full name</div>
                <input
                  className="border-2 rounded-md p-2"
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </label>
              {errors?.name && <div>{errors.name.message}</div>}
              <div className="p-2" />
              <label htmlFor="email" className="flex flex-col">
                <div className="mb-1">Email address</div>
                <input
                  className="border-2 rounded-md p-2"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      message: "Invalid email format",
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    },
                  })}
                />
              </label>
              {errors?.email && <div>{errors.email.message}</div>}
              <div className="p-2" />
              <label htmlFor="password" className="flex flex-col">
                <div className="mb-1">Password</div>
                <input
                  className="border-2 rounded-md p-2"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      message: "Password is too weak",
                      value: 6,
                    },
                  })}
                />
                {errors?.password && <div>{errors.password.message}</div>}
              </label>
              <div className="p-2" />
              <label htmlFor="confirmPassword" className="flex flex-col">
                <div className="mb-1">Confirm Password</div>
                <input
                  className="border-2 rounded-md p-2"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
              </label>
              {errors?.confirmPassword && (
                <div>{errors.confirmPassword.message}</div>
              )}
              <button
                className="px-6 py-3 bg-black rounded-lg text-white w-full mt-6"
                type="submit"
              >
                Create account
              </button>
            </form>
          </Card>
        </div>
      </Center>
    </Page>
  );
};

export default Signup;

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

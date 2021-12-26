import supabaseClient from "@/services/supabaseClient";
import Card from "@components/Card";
import Center from "@components/Center";
import Page from "@components/Page";
import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SigninProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signin: FC<SigninProps> = ({ setRefresh }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninFormValues>();

  const onSubmit: SubmitHandler<SigninFormValues> = async (values) => {
    try {
      const { email, password } = values;
      const { error } = await supabaseClient.auth.signIn({
        email,
        password,
      });

      if (error) {
        return toast.error(error.message);
      }

      setRefresh(true);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(errors);

  return (
    <Page>
      <Center>
        <h1 className="text-4xl">Welcome Back!</h1>
        <div className="p-4" />
        <div className="text-black">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  })}
                />
                {errors?.password && <div>{errors.password.message}</div>}
              </label>
              <button
                className="px-6 py-3 bg-black rounded-lg text-white w-full mt-6"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </Card>
        </div>
      </Center>
    </Page>
  );
};

export default Signin;

interface SigninFormValues {
  email: string;
  password: string;
}

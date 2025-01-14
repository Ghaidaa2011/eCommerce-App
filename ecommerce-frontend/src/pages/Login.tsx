import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLogin from "@hooks/useLogin";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  } = useLogin();
  const { t } = useTranslation("global");

  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Heading title={t("user.login")} />
      <Row>
        <Col md={6} className="mx-auto">
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              You need to log in to view this content
            </Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please log in.
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label={t("user.email")}
              name="email"
              register={register}
              error={formErrors.email?.message}
            />
            <Input
              type="password"
              label={t("user.password")}
              name="password"
              register={register}
              error={formErrors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>{" "}
                  {t("user.loading")}...
                </>
              ) : (
                t("user.submit")
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;

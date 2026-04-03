import DonationCards from "@/components/DonationCards";

export const metadata = {
  title: "Donaciones",
};
function page() {
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{borderBottom:'solid 2px #cf6ba1', color:'rgb(47, 46, 46)'}}>Donaciones</h1>
      </header>
      <DonationCards />
    </>
  );
}

export default page;

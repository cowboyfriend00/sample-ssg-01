import { useState, useEffect } from "react";
import { Router } from "next/router";

function Profile({ routerInfo }: { routerInfo: Router }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const [routerInfos, setRouterInfos] = useState<Router>();
  // console.log("Profile", routerInfo);

  useEffect(() => {
    console.log("useEffect");
    fetch("/api/profile-data")
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data["name"]}</h1>
      <p>{data["bio"]}</p>
    </div>
  );
}

export default Profile;

import Box from "@mui/material/Box";

function LeftMessage(props: any) {
  return (
    <div style={{ paddingLeft: "30px" }}>
      <div style={{ display: "block" }}>
        <div style={{ display: "flex" }}>
          <p
            style={{
              textAlign: "center",
              width: "80px",
              borderTopLeftRadius: "15px",
              backgroundColor: "#F6BA6F",
            }}
          >
            {props.time}
          </p>
          <p
            style={{
              textAlign: "center",
              width: "80px",
              backgroundColor: "#ADE4DB",
            }}
          >
            {props.author}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              backgroundColor: "#F6BA6F",
              width: "500px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomLeftRadius: "20px",
            }}
          >
            <p style={{ paddingLeft: "30px" }}>{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightMessage(props: any) {
  return (
    <div style={{ paddingRight: "30px" }}>
      <div style={{ display: "block" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex" }}>
            <p
              style={{
                textAlign: "center",
                width: "80px",
                backgroundColor: "#FFD966",
              }}
            >
              {props.author}
            </p>
            <p
              style={{
                textAlign: "center",
                width: "80px",
                borderTopRightRadius: "15px",
                backgroundColor: "#6DA9E4",
              }}
            >
              {props.time}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              backgroundColor: "#6DA9E4",
              width: "500px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              borderBottomRightRadius: "20px",
            }}
          >
            <p style={{ paddingRight: "30px" }}>{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RightMessage, LeftMessage };

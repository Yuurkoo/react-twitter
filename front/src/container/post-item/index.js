import { useState, Fragment } from "react";
import Box from "../../component/box";
import Grid from "../../component/grid";
import PostCreate from "../post-create";
import PostContent from "../../component/post-content";
import { Alert, LOAD_STATUS, Skeleton } from "../../component/load";
import { getDate } from "../../util/getDate";

export default function Container({ id, username, text, date }) {
  const [data, setDate] = useState({
    id,
    username,
    text,
    date,
    reply: null,
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch(`http://localhost:4000/post-item?id=${data.id}`);

      const resData = await res.json(); // отримуємо дані

      if (res.ok) {
        setDate(convertData(resData)); // якщо дані є, кладемо їх в setData і конвертуємо їх
        setStatus(LOAD_STATUS.SUCCESS); // відповідно статус успішний
      } else {
        setMessage(resData.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = (raw) => ({
    id: raw.post.id,
    usernames: raw.post.username,
    text: raw.post.text,
    date: getDate(raw.post.date),

    reply: raw.post.reply.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmty: raw.post.reply.length === 0,
  });

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    if (status === null) {
      getData();
    }

    setOpen(!isOpen);
  };

  return (
    <Box style={{ padding: "0" }}>
      <div
        style={{
          padding: "20px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <PostContent
          username={data.username}
          date={data.date}
          text={data.text}
        />
      </div>

      {isOpen && (
        <div style={{ padding: "0px 20px 20px 20px" }}>
          <Grid>
            <Box>
              <PostCreate
                placeholder="Post your reply!"
                button="Reply"
                id={data.id}
                onCreate={getData}
              />
            </Box>

            {status === LOAD_STATUS.PROGRESS && (
              <Fragment>
                <Box>
                  <Skeleton />
                </Box>
                <Box>
                  <Skeleton />
                </Box>
              </Fragment>
            )}

            {status === LOAD_STATUS.ERROR && (
              <Alert status={status} message={message} />
            )}

            {status === LOAD_STATUS.SUCCESS &&
              data.isEmty === false &&
              data.reply.map((item) => (
                <Fragment key={item.id}>
                  <Box>
                    <PostContent {...item} />
                  </Box>
                </Fragment>
              ))}
          </Grid>
        </div>
      )}
    </Box>
  );
}

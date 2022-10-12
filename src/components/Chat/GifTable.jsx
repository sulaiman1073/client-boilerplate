import React, { useState } from "react";
import Input from "../Controls/Input";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import strings from "../../helpers/localization";
import { Grid } from "@giphy/react-components";
import giphyFetch from "../../helpers/gifConfig";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../redux/actions";

export default function GifTable({ updateGifsOpen }) {
  const params = useParams();
  const channelId = params.channelId || params.roomId;
  const userId = useSelector(state => state.self.id);
  const avatar = useSelector(state => state.self.avatar);
  const currentUserUsername = useSelector(state => state.self.username);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSendGif = gif => {
    dispatch(
      addMessage({
        id: uuidv4(),
        userId,
        channelId,
        content: gif.images.fixed_height_downsampled.url,
        upload: null,
        createdAt: new Date().toString(),
        author: {
          id: "",
          username: currentUserUsername,
          avatar: avatar
        }
      })
    );
    // updateGifsOpen(false);
  };

  const gifsPromise = search
    ? offset => giphyFetch.search(search, { offset, limit: 10 })
    : offset => giphyFetch.trending({ offset, limit: 10 });

  return (
    <div className="flex flex-col giftable relative bg-secondaryBackground rounded-md w-84 h-64">
      <Input
        variant="user"
        size="sm"
        value={search}
        placeholder={strings.searchGifInput}
        onChange={e => setSearch(e.target.value)}
        className="p-1"
      />
      <div className="overflow-y-auto" style={{ minHeight: "214px" }}>
        <ul className="items-center grid grid-cols-2 overflow-y-auto py-4">
          <Grid
            key={search}
            columns={2}
            width={330}
            fetchGifs={gifsPromise}
            noLink
            className="cursor-pointer"
            onGifClick={handleSendGif}
          />
        </ul>
      </div>
    </div>
  );
}

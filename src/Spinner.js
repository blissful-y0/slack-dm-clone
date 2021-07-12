import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export default function Spinner() {
  return (
    <Dimmer active>
      <Loader size="huge" content="채팅 기능을 준비 중입니다..." />
    </Dimmer>
  );
}

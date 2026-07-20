import * as S from "./styles";
import { useRouter } from "next/router";

export default function HeaderEl({ isRhizome, setIsRhizome }) {
  const router = useRouter();

  return (
    <S.Container>
      <S.Upper>
        <S.Item
          onClick={() => setIsRhizome(true)}
          style={{
            opacity: isRhizome ? 1 : 0.4,
            textAlign: "left",
          }}
        >
          RHIZOME
        </S.Item>
        <S.UpperCenter>
          <S.CenterText
            style={{
              opacity: 0.35,
              textAlign: "right",
            }}
            onClick={() => {
              router.push("/events");
            }}
          >
            EVENTS
          </S.CenterText>
          <S.CenterText
            style={{
              textAlign: "left",
            }}
          >
            WORKS
          </S.CenterText>
        </S.UpperCenter>

        <S.Item
          onClick={() => setIsRhizome(false)}
          style={{
            opacity: isRhizome ? 0.4 : 1,
            textAlign: "right",
          }}
        >
          LIST
        </S.Item>
      </S.Upper>
    </S.Container>
  );
}

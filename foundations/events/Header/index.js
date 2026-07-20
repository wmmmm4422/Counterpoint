import * as S from "./styles";
import { useRouter } from "next/router";

export default function HeaderEl({ isRhizome, setIsRhizome }) {
  const router = useRouter();

  return (
    <S.Container>
      <S.Upper>
        <S.UpperCenter>
          <S.CenterText
            style={{
              textAlign: "right",
            }}
          >
            EVENTS
          </S.CenterText>
          <S.CenterText
            style={{
              opacity: 0.35,
              textAlign: "left",
            }}
            onClick={() => {
              router.push("/works");
            }}
          >
            WORKS
          </S.CenterText>
        </S.UpperCenter>
      </S.Upper>
    </S.Container>
  );
}

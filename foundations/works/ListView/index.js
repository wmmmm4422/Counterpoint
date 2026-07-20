import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { BsSearch } from "react-icons/bs";

export default function ListView({ socket, projectsData, isVisible, handleProjectClick }) {
  const [filterWord, setFilterWord] = useState("");
  const [filteredList, setFilteredList] = useState(projectsData);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (filterWord === "") {
      setFilteredList(projectsData.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      const filtered = projectsData.filter(
        (item) =>
          item.name.toLowerCase().includes(filterWord.toLowerCase()) ||
          item.studentName.toLowerCase().includes(filterWord.toLowerCase()) ||
          item.keywords.some((keyword) => keyword.name.toLowerCase().includes(filterWord.toLowerCase()))
      );
      setFilteredList(filtered);
    }
  }, [filterWord, projectsData]);

  return (
    <S.Container isVisible={isVisible}>
      {isVisible && (
        <S.SearchContainer>
          <S.P goUp={filterWord !== "" || focused}>
            <span>
              <BsSearch />
            </span>
            {filterWord === "" ? "Search for Projects or Students" : `${filteredList.length} results found`}
          </S.P>
          <S.SearchInput onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} type="text" placeholder="" value={filterWord} onChange={(e) => setFilterWord(e.target.value)} />
        </S.SearchContainer>
      )}

      <S.Description>
        The range of works present an opportunity to <i>immerse</i> yourself in questions about the current <i>status quo</i> of our society, cultural context, and the very notion of{" "}
        <i>creativity and interdisciplinary.</i>
      </S.Description>

      <S.ListContainer>
        {isVisible &&
          filteredList.map((item, idx) => (
            <S.ListItem
              key={idx}
              idx={idx}
              onClick={() => {
                if (socket && socket.current) socket.current.emit("project-click", item.name);
                handleProjectClick(item);
              }}
            >
              <S.ListItemTitle>{item.name}</S.ListItemTitle>
              <S.ListItemContent>{item.studentName}</S.ListItemContent>
            </S.ListItem>
          ))}
        {isVisible && filteredList.length === 0 && <S.ListItem>No results found</S.ListItem>}
      </S.ListContainer>
    </S.Container>
  );
}

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Brand, Menu, Search, Content, NewNote } from './style';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [search, setSearch] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleSelectedTag(tagName){

    if(tagName === "all") {
      return setSelectedTag([]);

    }

    const alreadySelected = selectedTag.includes(tagName);

    if(alreadySelected){
      const filteredTags = selectedTag.filter(tag => tag !== tagName);
      setSelectedTag(filteredTags);

    } else {
      setSelectedTag(prevState => [...prevState, tagName]);
    }
  }


  function handleDetails(id){
    navigate(`/details/${id}`);

  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get('/tags');
      setTags(response.data);

    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${selectedTag}`);
      setNotes(response.data);
    }

    fetchNotes();
  }, [selectedTag, search])

  return(
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li> 
          <ButtonText 
            title='Todos' 
            onClick={() => handleSelectedTag("all")}
            isActive={selectedTag.length === 0}
            /> 
        </li>
       {
         tags && tags.map(tag => (
           <li key={String(tag.id)} > 
            <ButtonText 
              title={tag.name} 
              onClick={() => handleSelectedTag(tag.name)}
              isActive={selectedTag.includes(tag.name)}
            /> 
          </li>
        ))
       }
      </Menu>
    
      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
 
      <Content>
        <Section title='Minhas Notas'>
          {
            notes.map(note => (
            <Note 
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
           ))
          }
        </Section>
      </Content>


      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>


 
    </Container>
  );
}

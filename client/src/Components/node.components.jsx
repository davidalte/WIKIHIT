import React , {useState, Fragment } from 'react';
import ReactFlow, {addEdge, Background, Controls, MiniMap, useStoreState } from 'react-flow-renderer';
import { wiki } from '../stores';
import getWikiHtml from './getWikiHtml';
import { view } from 'react-easy-state';

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}

export default view(() => {
    const [elements, setElements] = useState(wiki.nodes);
    console.log(wiki.nodes);
    const [name, setName] = useState("");

    const onElementClick =  async (event, element) => {
        event.preventDefault();
        try{
            wiki.currentId = element.id;
            await getWikiHtml(element.data.title);
        }catch(err){
            console.log(err + 'function');
        }
        
    };
    
    const addNode = () => {
        setElements(e => e.concat({
            id:(e.length+1).toString(),
            data: {label:`${name}`},
            position: {x: Math.random() *window.innerWidth / 2, y: Math.random() *window.innerHeight / 2},
        })); 
    };

    //const onConnect = (params) => setElements(e => addEdge(params,e));

    return(
        <Fragment>
            <ReactFlow
            onElementClick={onElementClick}
            elements={elements}
            onLoad={onLoad}
            style={{width :'100%', height: '90vh'}}
            //onConnect={onConnect}
            connectionLineStyle={{stroke: '#ddd', strokeWidth: 2}}
            connectionLineType = 'bezier'
            snapToGrid= {true}
            snapGrid={[16,16]}
            >
            <Background 
                color = "#888"
                gap={16}
            />
            <MiniMap    
            nodeColor={n=>{
                if(n.type === 'input') return 'blue';
                return '#FFCC00';
            }} />
            <Controls/>
            </ReactFlow>
            <div>
                <input type="text"
                onChange={e => setName(e.target.value)}
                name="title" />
                <button type="button" 
                onClick = {addNode}
                >add node</button>
            </div>
        </Fragment>
    )
});

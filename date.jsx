import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';

export class MyDate extends Component{
    constructor(props){
        super(props);
        this.selectDate=this.selectDate.bind(this);
        this.selectMonth=this.selectMonth.bind(this);
        this.selectYear=this.selectYear.bind(this);
        this.resetMonth=this.resetMonth.bind(this);
        var year=new Date().getFullYear();
        var month=new Date().getMonth()+1;
        var date=new Date().getDate();
        this.state={
          year: year,
          month:month,
          date:date
        }
    }
    static defaultProps() {
        var year=new Date().getFullYear();
        var month=new Date().getMonth()+1;
        var date=new Date().getDate();
        return {
          year: year,
          month:month,
          date:date
        };
    }
    selectDate(date){
    this.setState({
            date:date
        })
    }
    selectMonth(month){
        this.setState({
            month:month
        })
    }
    selectYear(year){
        this.setState({
            year:year
        })
    }      
    resetMonth(val){
      var month=this.state.month;
      var year=this.state.year;
      if((parseInt(this.state.month)+val)==13){
         month=1;
         year++;
      }else if((parseInt(this.state.month)+val)==0){
         month=12;
         year--;
      }else{
        month=parseInt(this.state.month)+val;
      }
      this.setState({month:month,year:year})
    }
    render(){
        return(
            <div className="wrapper">
                <div className="wrap">
                    <ShowDate showDate={this.state.year+'-'+this.state.month+'-'+this.state.date}/>
                    <SelectDate selectMonth={this.selectMonth} selectYear={this.selectYear} month={this.state.month} year={this.state.year} resetMonth={this.resetMonth}/>
                    <div className="day">
                        <span>日</span>
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>            
                    </div>
                    <ClickDay month={this.state.month} selectDate={this.selectDate} year={this.state.year}/>                        
                </div>
            </div>
        )
    }
 }



class ShowDate extends Component{
    render(){
        return(<div className="selectDate">{this.props.showDate}</div>)
    }
}

class SelectDate extends Component{
	constructor(props){
		super(props)
		this.handleMonthChange=this.handleMonthChange.bind(this);
		this.handleYearChange=this.handleYearChange.bind(this);
		this.resetMonth=this.resetMonth.bind(this);
	}
    handleMonthChange(event){
        this.props.selectMonth(event.target.value)
    }
    handleYearChange(event){
        this.props.selectYear(event.target.value)
    }
    resetMonth(event){
       var value=parseInt(event.target.getAttribute('value'));
      this.props.resetMonth(value);
    }
    render(){
        var optionsYear=[],
            optionsMonth=[],
            year=new Date().getFullYear(),
            month=parseInt(this.props.month);
        for(var i=year-20;i<year+21;i++) {                
            optionsYear.push(<OptionList value={i} key={i}/>)
        } 

        for(var i=1;i<13;i++) {                
            optionsMonth.push(<OptionList value={i} key={i}/>)
        }          
        return (<div className="select" >
            <span onClick={this.resetMonth} value="-1">《</span>
            <select className="choose" value={this.props.year} onChange={this.handleYearChange}>
               {optionsYear}
            </select>
            <select className="choose" value={this.props.month} onChange={this.handleMonthChange}>
               {optionsMonth}
            </select> 
            <span onClick={this.resetMonth} value="1">》</span>               
        </div>)
    }
 }

class OptionList extends Component{
    render(){
        return (<option value={this.props.value}>{this.props.value}</option>)
    }
 }

class ElementList extends Component{
	constructor(props){
		super(props);
		this.handleClick=this.handleClick.bind(this);
	}
    handleClick(event){
      if(event.target.className=='forbid')return;
      this.props.handleDateChange(event.target.innerText)
    }
    render(){
        return (<tr>
                <td className={this.props.class[0]} onClick={this.handleClick}>{this.props.value[0]}</td>
                <td className={this.props.class[1]} onClick={this.handleClick}>{this.props.value[1]}</td>
                <td className={this.props.class[2]} onClick={this.handleClick}>{this.props.value[2]}</td>
                <td className={this.props.class[3]} onClick={this.handleClick}>{this.props.value[3]}</td>
                <td className={this.props.class[4]} onClick={this.handleClick}>{this.props.value[4]}</td>
                <td className={this.props.class[5]} onClick={this.handleClick}>{this.props.value[5]}</td>
                <td className={this.props.class[6]} onClick={this.handleClick}>{this.props.value[6]}</td>
            </tr>)
    }
 }

class ClickDay extends Component{
	constructor(props){
		super(props);
		this.handleDateChange=this.handleDateChange.bind(this)
	}
    handleDateChange(value){            
        this.props.selectDate(value)
    }
    render(){
       var month =this.props.month,
           year = this.props.year,               
           days=getDays(month,year),
           predate =new Date(year+'/'+month+'/1'), 
           preday  =predate.getDay(),
           nextdate =new Date(year+'/'+month+'/'+getDays(month,year)), 
           nextday  =nextdate.getDay(),
           pre=month<2?getDays(12,parseInt(year)-1):getDays(month-1,year),
           next=month<12?getDays(month+1,year):getDays(1,parseInt(year)+1);
                

       function getDays(month,year){
            var month=month+'';                
            switch(month){
               case '1':;
               case '3':;
               case '5':;
               case '7':;
               case '8':;
               case '10':;
               case '12':return '31';break;
               case '4':;
               case '6':;
               case '9':;
               case '11':return '30';break;
               case '2':return ((year%400==0||(year%4==0 && year%100!=0))?29:28);break;
            }
       }        
                 

       function createNum(pre,preday,days){
          var rowOne =[],
              rowMiddle=[],
              rowLast=[],
              num=[];

          for(var i=0;i<preday;i++){
            rowOne.push(pre-preday+i+1)
          }

          for(var j=1;j<8-preday;j++){
            rowOne.push(j)
          }

          num.push(rowOne);

          for(var k=8-preday;k<parseInt(days)+1;k++){
            rowMiddle.push(k);
            if(rowMiddle.length==7){
                num.push(rowMiddle);
                rowMiddle=[];
            }                
          }

          

          ;(function(){
            for(var l=1;l<8;l++){ 
                if(rowMiddle.length==0){return}                       
                rowMiddle.push(l);
                if(rowMiddle.length==7){
                num.push(rowMiddle);
                    return
                }
            }
          })()              

         return num
       } 
       var num=createNum(pre,preday,days);
       var trs=[];
       var j=0;
       var that=this;
       num.forEach(function(value,index){
            var className=[];
            value.forEach(function(val,i){
                if(index==0){
                    if(val>10){
                      className.push('forbid')
                    }else{
                      className.push('right')
                    }
                }else if(index==(num.length-1)){
                    if(val<10){
                        className.push('forbid')
                    }else{
                        className.push('right')
                    }
                }else{
                    className.push('right')
                } 
            })                 
            trs.push(<ElementList class={className} value={value} key={j++} handleDateChange={that.handleDateChange}/>)
       })
        return (
        <div className="date">
            <table>
            <tbody>
                {trs}
            </tbody>
            </table>
        </div>
        )
    }
 }



 
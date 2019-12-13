pragma solidity >=0.4.22 <0.7.0;

contract assert{
    
 struct receipt {

    uint number;
	address come; // 欠款人
	address to; // 收款人
	uint mount; // 金额
	bool status; // 状态，
	
	int deadline;
}
    address public Manager;
    mapping (uint => receipt) public receipts;
    mapping (address => uint) public balances;

    constructor(){
        Manager=msg.sender;
      
      }

   
    function Grade(address To,uint mount,string From_To,int Date,uint num,bool status ) public returns(string,address,address,uint,int,bool){
        uint i=0;
        bool gea=true;
        if(balances[msg.sender]<mount)
        {
        for(i=1;i<30;i++)
        {
            if(receipts[i].to==msg.sender&&receipts[i].mount!=0)
            {
                if(receipts[i].mount>mount)
                {
                    receipts[num].come=receipts[i].come;
                    receipts[num].to=To;
                    receipts[num].mount=mount;
                    receipts[num].number=num;
                    receipts[num].deadline=Date;
                    receipts[num].status=status;
                    
                    receipts[i].mount=receipts[i].mount-mount;
                    
                }
                else
                {
                   
                    
                    receipts[num].come=receipts[i].come;
                    receipts[num].to=To;
                    receipts[num].mount=receipts[i].mount;
                    receipts[num].number=num;
                    receipts[num].deadline=Date;
                    receipts[num].status=status;
                    
                    receipts[num+10].come=msg.sender;
                    receipts[num+10].to=To;
                    receipts[num+10].mount=mount-receipts[i].mount;
                    receipts[num+10].number=num+10;
                    receipts[num+10].deadline=Date;
                    receipts[num+10].status=status;
                    
                     receipts[i].mount=0;
                }
                gea=false;
                
            }            
            
        }
        if(gea!=false)
            {
        
        
        
                 receipts[num].come=msg.sender;
                receipts[num].to=To;
                 receipts[num].mount=mount;
                receipts[num].number=num;
                receipts[num].deadline=Date;
                receipts[num].status=status;
             }
        }
        else
        {
            balances[msg.sender]-=mount;
            
        }
        return ("Success",msg.sender,To,mount,Date,status);
    }
    
    function GradeWithBank() public returns(string,uint){
        uint sum=0;
          for(uint i=1;i<30;i++)
        {
            if(receipts[i].to==msg.sender)
            {
                balances[msg.sender] += (receipts[i].mount);
                sum+=receipts[i].mount;
                receipts[i].to=Manager;
            }
            
      
  
        }
        
        return ("Success",sum);
 }
 
     function Repay(int Date) public returns(string){
       
       
            uint sum=0;
              for(uint i=1;i<30;i++)
        {
            if(receipts[i].come==msg.sender)
            {
                 if(Date>receipts[i].deadline)
        return ("Fail long time");
                
                else
                {
                    sum+=receipts[i].mount;
                receipts[i].mount=0;
             receipts[i].deadline=99999999;
                }
            }
        }
      
             
        
      
        return ("Success");
 }
    


}
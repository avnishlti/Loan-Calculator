import { Component, h, Prop } from '@stencil/core';

@Component({
    tag :'my-calculator',
    styleUrl :'calculator.css',
    shadow: true
})

export class MyCalculator{

    @Prop({mutable: true}) amount: any;
    @Prop({mutable: true}) rate: any;
    @Prop({mutable: true}) months: any;
    @Prop({mutable: true}) total: any = 0;
    @Prop({mutable: true}) totalPayment: any = 0;

    liveAmount(event: Event){
        this.amount = (event.target as HTMLFormElement).value;
        this.liveCalculation();
    }
    liveRate(event: Event){
        this.rate = (event.target as HTMLFormElement).value;
        this.liveCalculation();
    }
    liveMonths(event: Event){
        this.months = (event.target as HTMLFormElement).value;
        this.liveCalculation();
    }
    liveCalculation(){
        let newrate = this.rate/(12*100)
        this.total = (this.amount * newrate * (((Math.pow((1+newrate),this.months))/((Math.pow((1+newrate),this.months))-1)))).toFixed(2);
        this.totalPayment = (this.total*this.months).toFixed(2);
    }

    render(){
        return(
            <div class="background-style">
                <h1>Loan Calculator</h1>

                <p>Amount ($) : 
                    <input type="number" onInput={this.liveAmount.bind(this)}/>	
                </p>

                <p>Interest Rate : 
                    <input type="number" onInput={this.liveRate.bind(this)}/>
                </p>

                <p>Months to Pay :
                    <input type="number" onInput={this.liveMonths.bind(this)}/>
                </p>

                <h2>Monthly Payments: {this.total}</h2>
                <h3>Total Payments: {this.totalPayment}</h3>
            </div>
        );
    }
}
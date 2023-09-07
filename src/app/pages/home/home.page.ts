import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.services'; 

interface ChildCourse {
  childID: number;
  childColor: string;
  childName: string;
  courseType: string;
  dayOfWeek: 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי' | 'שבת';
  startTime: string;
  endTime: string;

}

=======
>>>>>>> origin/master

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

<<<<<<< HEAD
  isPopupVisible = false;
  selectedDateDetails: ChildCourse[] = [];
  phoneNumber: string | null = '';
  currentDate: string = new Date().toISOString().split('T')[0];
  highlightedDates: any[] = [];
  uniqueChildrenList: ChildCourse[] = [];
  childrenCourses: ChildCourse[] = [];

  dayMapping: { [key: string]: number } = {
    'ראשון': 0,
    'שני': 1,
    'שלישי': 2,
    'רביעי': 3,
    'חמישי': 4,
    'שישי': 5,
    'שבת': 6
};



  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    
  
    this.phoneNumber = this.route.snapshot.paramMap.get('phone');
  

    if (!this.phoneNumber) {
      this.phoneNumber = localStorage.getItem('phoneNumber') || '';
    }
  

    if (this.phoneNumber) {
      this.courseService.getChildrenCourses(this.phoneNumber).subscribe((data: ChildCourse[]) => {
        if (!data || data.length === 0) {
          console.error('Received empty data array');
          return;
        }
    
        
        this.uniqueChildrenList = data.filter((child, index, self) => 
            index === self.findIndex(t => t.childID === child.childID)
        );
        
     
        this.childrenCourses = data;
    
        this.childrenCourses.forEach(child => {
          if (!child.dayOfWeek) {
            console.error('Day of week is missing for child:', child);
            return;  
          }
        
   
          const nextDates = this.getNextNDatesForDayOfWeek(child.dayOfWeek, 10)
            .filter(date => !isNaN(date.getTime()));  
        
          nextDates.forEach(dateObj => {
            const dateString = dateObj.toISOString().split('T')[0];
            const existingDate = this.findDateInHighlightedDates(dateString);
        
            if (existingDate) {
      
              existingDate.courseTypes = existingDate.courseTypes || new Set();
              existingDate.courseTypes.add(child.courseType);
        
     
              if(Array.from(existingDate.courseTypes).includes(child.courseType)) {
                existingDate.backgroundColor = 'black';
              }
              
            } else {
          
              this.highlightedDates.push({
                date: dateString,
                textColor: '#FFFFFF',
                backgroundColor: child.childColor,
                courseTypes: new Set([child.courseType]) 
              });
            }
          });
        });
    });
    
    
    
    
    
    } else {
      // Handle the case where phoneNumber is null or undefined
      // You might want to redirect the user back to the login page or show an alert.
    }
  }
  
  getNextNDatesForDayOfWeek(dayName: 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי' | 'שבת', n: number): Date[] {
    if (!dayName) {
      console.error('Day name is null');
      return [];
    }
    const dates: Date[] = [];
    const dayOfWeek = this.dayMapping[dayName];
    
    if(dayOfWeek === undefined) {
        console.error('Invalid day name:', dayName);
        return [new Date(NaN)]; 
    }

    const today = new Date();

    for (let i = 0; i < n; i++) {
        const resultDate = new Date(today.getTime());
        const calculatedDate = (dayOfWeek + 7 - today.getDay()) % 7 + (i * 7);
        resultDate.setDate(today.getDate() + calculatedDate);
        dates.push(resultDate);
    }

    return dates;
}

findDateInHighlightedDates(date: string): any | null {
  return this.highlightedDates.find(d => d.date === date);
}

onDateSelected(event: any): void {
  console.log("onDateSelected called");
  const date = event.detail?.value;

  if (date) {
    const details = this.childrenCourses
      .filter(child => child.dayOfWeek !== null)
      .filter(child => 
        this.getNextNDatesForDayOfWeek(child.dayOfWeek, 10)
        .map(d => !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : null)
        .includes(date)
      );

    console.log('Filtered Details:', details);

    if (this.uniqueChildrenList.length > 0) {
      this.selectedDateDetails = details;
      this.isPopupVisible = true;
    }
  }
}



closePopup(): void {
  this.isPopupVisible = false;
}

  goBack() {
    this.router.navigateByUrl('/login');
    
  }
=======
  constructor() { }

  ngOnInit() {
  }

>>>>>>> origin/master
}

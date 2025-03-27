import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-list',
    standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchQuery: string = '';
  jobs = [
    {
      title: 'Software Engineer',
      location: 'New York',
      employmentType: 'Full-time',
      requiredSkills: ['JavaScript', 'Angular', 'TypeScript'],
      color: '#ff5733'
    },
    {
      title: 'Data Analyst',
      location: 'San Francisco',
      employmentType: 'Part-time',
      requiredSkills: ['SQL', 'Python', 'Tableau'],
      color: '#33ff57'
    },
    {
      title: 'UX Designer',
      location: 'Los Angeles',
      employmentType: 'Full-time',
      requiredSkills: ['Figma', 'Adobe XD', 'User Research'],
      color: '#3357ff'
    }
  ];

  filteredJobs = [...this.jobs]; // Initialize with all jobs
  newJob = {
    title: '',
    location: '',
    employmentType: 'Full-time',
    requiredSkills: '',
    color: ''
  };

  ngOnInit() {
    this.newJob.color = this.getRandomColor(); // Assign a random color when the component loads
  }

  filterJobs() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.employmentType.toLowerCase().includes(query) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(query))
    );
  }

  addJob() {
    if (!this.newJob.title || !this.newJob.location || !this.newJob.requiredSkills) {
      alert('Please fill in all fields.');
      return;
    }

    const jobToAdd = {
      title: this.newJob.title,
      location: this.newJob.location,
      employmentType: this.newJob.employmentType,
      requiredSkills: this.newJob.requiredSkills.split(',').map(skill => skill.trim()),
      color: this.getRandomColor()
    };

    this.jobs.push(jobToAdd);
    this.filteredJobs = [...this.jobs]; // Update the filtered list
    this.resetForm();
  }

  resetForm() {
    this.newJob = {
      title: '',
      location: '',
      employmentType: 'Full-time',
      requiredSkills: '',
      color: this.getRandomColor()
    };
  }

  getRandomColor(): string {
    const colors = ['#ff5733', '#33ff57', '#3357ff', '#ff33a8', '#ffcc00'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
